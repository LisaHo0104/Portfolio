export {};

declare module "*.glb" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "meshline" {
  import type { BufferGeometry, Material } from "three";
  export const MeshLineGeometry: new () => BufferGeometry;
  export const MeshLineMaterial: new (params?: object) => Material;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: object;
      meshLineMaterial: object;
    }
  }
}
