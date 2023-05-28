import * as THREE from 'three';
import { init, animate } from './three-handler.js';

//import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
//import HDR from "./assets/static/sepulchral_chapel_rotunda_2k.hdr";

init().then(() => animate());
