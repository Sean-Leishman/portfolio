import { WebGLRenderer } from 'three';

function createRenderer() {
    const instance = new WebGLRenderer({antialias: false});

    return instance;
}

export { createRenderer };
