import Phaser from "phaser";

export default class BootGame extends Phaser.Scene {
    constructor({gem, character}) {
        super('bootGame'); // Identifier for this scene
        this.gem = gem;
        this.character = character;
    }

    preload() {
        this.load.image('taiga', "../assets/game/taiga.png");
        this.load.image('tundra', "../assets/game/tundra.png");

        this.load.audio('swing', ['../assets/game/mixkit-dagger-woosh.mp3']);
        this.load.audio('falling', ['../assets/game/mixkit-falling-hit-on-gravel.mp3']);
        this.load.audio('bonk', ['../assets/game/bonk.mp3']);
        this.load.audio('step', ['../assets/game/sfx_step_grass.mp3'])

        // Monsters
        this.load.spritesheet('goblin', "../assets/game/caveSprites_/goblin_.png", {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('orc', "../assets/game/dungeonSprites_/orc_.png", {
            frameWidth: 24,
            frameHeight: 24
        })

        this.load.spritesheet('demon', "../assets/game/dungeonSprites_/demon_.png", {
            frameWidth: 24,
            frameHeight: 24
        })

        this.load.spritesheet('skeleton', "../assets/game/dungeonSprites_/skeleton_.png", {
            frameWidth: 24,
            frameHeight: 24
        })

        // Characters
        this.load.spritesheet('knight', "../assets/game/dungeonSprites_/knight_.png", {
            frameWidth: 24, 
            frameHeight: 24
        })

        // Weapons and others

        this.load.spritesheet('excalibur', "../assets/game/camelot_/excalibur_.png", {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('pickaxe_diamond', "../assets/game/caveSprites_/pickaxe_diamond.png",{
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('wooden_sword', "../assets/game/images/wooden_sword.png",{
            frameWidth: 12,
            frameHeight: 24
        })
        this.load.spritesheet('iron_sword', "../assets/game/images/iron_sword.png",{
            frameWidth: 12,
            frameHeight: 24
        })
        this.load.spritesheet('golden_sword', "../assets/game/images/golden_sword.png",{
            frameWidth: 12,
            frameHeight: 24
        })
        this.load.spritesheet('diamond_sword', "../assets/game/images/diamond_sword.png",{
            frameWidth: 12,
            frameHeight: 24
        })


        this.load.spritesheet('dust', "../assets/game/caveSprites_/dust_.png", {
            frameWidth: 8,
            frameHeight: 8
        })
    }

    create() {
        this.background = this.add.image(0, 0, "background");
        this.background.setOrigin(0, 0);
        this.add.text(20, 20, "Loading Game...");
        this.scene.start("playGame");

        // Particle
        this.anims.create({
            key: 'idle_dust_particle',
            frames: this.anims.generateFrameNumbers('dust', {
                start: 0,
                end: 0
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'dust_particle',
            frames: this.anims.generateFrameNumbers('dust', {
                start: 0,
                end: 5
            }),
            frameRate: 10,
            repeat: -1,
        })

        // Animations
        this.anims.create({
            key: 'idle_goblin_anim',
            frames: this.anims.generateFrameNumbers('goblin', {
                start: 4,
                end: 7
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'ded_goblin_anim',
            frames: this.anims.generateFrameNumbers('goblin', {
                start: 60,
                end: 63
            }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })

        this.anims.create({
            key: 'idle_orc_anim',
            frames: this.anims.generateFrameNumbers('orc', {
                start: 4,
                end: 7
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'ded_orc_anim',
            frames: this.anims.generateFrameNumbers('orc', {
                start: 44,
                end: 47
            }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })

        this.anims.create({
            key: 'idle_demon_anim',
            frames: this.anims.generateFrameNumbers('demon', {
                start: 4,
                end: 7
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'ded_demon_anim',
            frames: this.anims.generateFrameNumbers('demon', {
                start: 44,
                end: 47
            }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })

        this.anims.create({
            key: 'idle_skeleton_anim',
            frames: this.anims.generateFrameNumbers('skeleton', {
                start: 4,
                end: 7
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'ded_skeleton_anim',
            frames: this.anims.generateFrameNumbers('skeleton', {
                start: 52,
                end: 55
            }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })

        // Knight

        this.anims.create({
            key: 'idle_knight_anim',
            frames: this.anims.generateFrameNumbers('knight', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'run_knight_anim',
            frames: this.anims.generateFrameNumbers('knight', {
                start: 16,
                end: 19
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: 'ded_knight_anim',
            frames: this.anims.generateFrameNumbers('knight', {
                start: 40,
                end: 43
            }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
            // zeroPad: 4
        })
        // Weapons and Others

        this.anims.create({
            key: 'excalibur_idle',
            frames: this.anims.generateFrameNumbers('excalibur', {
                start: 0,
                end: 0,
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'excalibur_swing_r',
            frames: this.anims.generateFrameNumbers('excalibur', {
                start: 0,
                end: 7,
            }),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        })

        this.anims.create({
            key: 'pickaxe_swing_l',
            frames: this.anims.generateFrameNumbers('pickaxe_diamond', {
                start: 7,
                end: 11,
            }),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        })
    }
}