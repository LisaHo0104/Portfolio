/* eslint-disable react/no-unknown-property */
"use client";

import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";

import "./Lanyard.css";

/** Extended rigid body with optional lerped vector for smoothing */
type RigidBodyWithLerped = RapierRigidBody & { lerped?: THREE.Vector3 };

/** Mesh with MeshLineGeometry (has setPoints on geometry) */
interface MeshLineMesh extends THREE.Mesh {
  geometry: THREE.BufferGeometry & { setPoints(points: THREE.Vector3[]): void };
}

/** GLB node names used by card.glb */
interface CardNodes {
  card?: THREE.Mesh;
  clip?: THREE.Mesh;
  clamp?: THREE.Mesh;
}

/** GLB material names used by card.glb */
interface CardMaterials {
  base?: THREE.MeshStandardMaterial & { map?: THREE.Texture };
  metal?: THREE.Material;
}

const cardGLB = "/assets/lanyard/card.glb";
const lanyardUrl = "/assets/lanyard/lanyard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

export type LanyardProps = {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
};

export default function Lanyard({
  position = [0, 0, 12],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardProps) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position, fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ antialias: true, alpha: transparent }}
        frameloop="always"
        onCreated={({ gl }) =>
          gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        }
      >
        <ambientLight intensity={Math.PI} />
        <Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
        </Suspense>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

type BandProps = {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
};

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
}: BandProps) {
  const band = useRef<MeshLineMesh | null>(null);
  const fixed = useRef<RapierRigidBody | null>(null);
  const j1 = useRef<RigidBodyWithLerped | null>(null);
  const j2 = useRef<RigidBodyWithLerped | null>(null);
  const j3 = useRef<RapierRigidBody | null>(null);
  const card = useRef<RapierRigidBody | null>(null);

  const vec = useRef(new THREE.Vector3());
  const ang = useRef(new THREE.Vector3());
  const rot = useRef(new THREE.Vector3());
  const dir = useRef(new THREE.Vector3());

  const segmentProps = {
    type: "dynamic" as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyardUrl);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, setDragged] = useState<false | THREE.Vector3>(false);
  const [hovered, setHovered] = useState(false);

  useRopeJoint(
    fixed as React.RefObject<RapierRigidBody>,
    j1 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1]
  );
  useRopeJoint(
    j1 as React.RefObject<RapierRigidBody>,
    j2 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1]
  );
  useRopeJoint(
    j2 as React.RefObject<RapierRigidBody>,
    j3 as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 0, 0], 1]
  );
  useSphericalJoint(
    j3 as React.RefObject<RapierRigidBody>,
    card as React.RefObject<RapierRigidBody>,
    [[0, 0, 0], [0, 1.5, 0]]
  );

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && card.current) {
      vec.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.current.copy(vec.current).sub(state.camera.position).normalize();
      vec.current.add(dir.current.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => {
        const rb = ref.current as RapierRigidBody | null;
        rb?.wakeUp?.();
      });
      card.current.setNextKinematicTranslation({
        x: vec.current.x - dragged.x,
        y: vec.current.y - dragged.y,
        z: vec.current.z - dragged.z,
      });
    }

    if (fixed.current && band.current?.geometry) {
      [j1, j2].forEach((ref) => {
        const rb = ref.current;
        if (!rb) return;
        if (!rb.lerped) {
          const t = rb.translation();
          rb.lerped = new THREE.Vector3(t.x, t.y, t.z);
        }
        const lerped = rb.lerped;
        const t = rb.translation();
        const tVec = new THREE.Vector3(t.x, t.y, t.z);
        const dist = lerped.distanceTo(tVec);
        const clampedDistance = Math.max(0.1, Math.min(1, dist));
        lerped.lerp(
          tVec,
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current!.translation() as unknown as THREE.Vector3);
      curve.points[1].copy((j2.current as RigidBodyWithLerped).lerped ?? (() => {
        const t = j2.current!.translation();
        return new THREE.Vector3(t.x, t.y, t.z);
      })());
      curve.points[2].copy((j1.current as RigidBodyWithLerped).lerped ?? (() => {
        const t = j1.current!.translation();
        return new THREE.Vector3(t.x, t.y, t.z);
      })());
      curve.points[3].copy(fixed.current!.translation() as unknown as THREE.Vector3);

      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    }

    if (card.current) {
      try {
        const c = card.current;
        ang.current.copy(c.angvel() as unknown as THREE.Vector3);
        rot.current.copy(c.rotation() as unknown as THREE.Vector3);
        c.setAngvel(
          { x: ang.current.x, y: ang.current.y - rot.current.y * 0.25, z: ang.current.z },
          true
        );
      } catch {
        // ignore
      }
    }
  });

  (curve as THREE.CatmullRomCurve3 & { curveType: string }).curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  const cardNodes = nodes as CardNodes | undefined;
  const cardMaterials = materials as CardMaterials | undefined;
  const hasReferenceStructure =
    cardNodes?.card && cardNodes?.clip && cardNodes?.clamp &&
    cardMaterials?.base && cardMaterials?.metal;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.98, 1.38, 0.01]} />
          <group
            scale={2.75}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e: React.PointerEvent) => {
              (e.target as Element).releasePointerCapture(e.pointerId);
              setDragged(false);
            }}
            onPointerDown={(e: React.PointerEvent<Element> & { point: THREE.Vector3 }) => {
              (e.target as Element).setPointerCapture(e.pointerId);
              const t = card.current?.translation();
              if (!t) return;
              setDragged(
                new THREE.Vector3().copy(e.point).sub(vec.current.copy(t as unknown as THREE.Vector3))
              );
            }}
          >
            {hasReferenceStructure && cardNodes && cardMaterials ? (
              <>
                <mesh geometry={cardNodes.card!.geometry}>
                  <meshPhysicalMaterial
                    map={cardMaterials.base!.map}
                    map-anisotropy={16}
                    clearcoat={isMobile ? 0 : 1}
                    clearcoatRoughness={0.15}
                    roughness={0.9}
                    metalness={0.8}
                  />
                </mesh>
                <mesh
                  geometry={cardNodes.clip!.geometry}
                  material={cardMaterials.metal}
                  material-roughness={0.3}
                />
                <mesh
                  geometry={cardNodes.clamp!.geometry}
                  material={cardMaterials.metal}
                />
              </>
            ) : (
              <CardFallback />
            )}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-expect-error meshline extended elements */}
        <meshLineGeometry />
        {/* @ts-expect-error meshline extended elements */}
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap={1}
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}

function CardFallback() {
  const { scene } = useGLTF(cardGLB);
  const cloned = useRef<THREE.Group | null>(null);
  if (!cloned.current) {
    cloned.current = scene.clone();
    const lightGrey = new THREE.Color(0xf0f0f0);
    cloned.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material;
        if (!mat) return;
        const mats = Array.isArray(mat) ? mat : [mat];
        mats.forEach((m: THREE.Material) => {
          const matWithProps = m as THREE.Material & { color?: THREE.Color; roughness?: number; metalness?: number };
          if (matWithProps.color) matWithProps.color.copy(lightGrey);
          if (matWithProps.roughness != null) matWithProps.roughness = 0.7;
          if (matWithProps.metalness != null) matWithProps.metalness = 0.1;
        });
      }
    });
  }
  return <primitive object={cloned.current} />;
}

useGLTF.preload(cardGLB);
