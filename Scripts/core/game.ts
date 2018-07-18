/// <reference path = "_references.ts"/>

// IIFE - Immediately Invoked Function Expression

(function(){
     

    //Game variables

    let canvas = document.getElementById("canvas");
    let stage:createjs.Stage;
    let helloLabel:objects.Label;
    let clickMeButton: objects.Button;
    let assetManager : createjs.LoadQueue;
    let assetManifest: any[];
    let currentScene : objects.Scene;
   let currentState : number;
   let keyBoardManager : managers.Keyboard;

    assetManifest = [
        {id: "clickMeButton", src:"./Assets/images/click_here_button.png"},
        {id: "startButton", src:"./Assets/images/startButton.png"},
        {id: "nextButton", src:"./Assets/images/nextButton.png"},
        {id: "backButton", src:"./Assets/images/backButton.png"},
        {id: "resetButton", src:"./Assets/images/resetButton.png"},
        {id: "ocean", src:"./Assets/images/ocean.gif"},
        {id: "plane", src:"./Assets/images/plane.png"},
        {id: "island", src:"./Assets/images/island.png"},
        {id: "cloud", src:"./Assets/images/cloud.png"},
        {id:"engine", src:"./Assets/audio/engine.ogg"},
        {id:"thunder", src:"./Assets/audio/thunder.ogg"},
        {id:"yay", src:"./Assets/audio/yay.ogg"},

        ];
        //preloads assets
    function Init():void{
        console.log("Initialization Started");
        assetManager = new createjs.LoadQueue();//creates the asset manager object
        assetManager.installPlugin(createjs.Sound);//asset manager can also load sounds
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete",Start, this);
            
    }

    function Start():void{
        console.log("Starting Application....");

        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20); // turn this on for buttons
        createjs.Ticker.framerate = 60; //60 FPS
        createjs.Ticker.on("tick", Update);
        managers.Game.stage = stage;

        managers.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;

        keyBoardManager = new managers.Keyboard();
        managers.Game.keyBoardManager = keyBoardManager;
        managers.Game.assetManager = assetManager;

        Main();
        
    }
    
    function Update():void
    {
      
        //if the scene that is playing returns another scene 
        //then call main again
           if(currentState != managers.Game.currentScene){
               
               Main();     
           }
           currentScene.Update();
        stage.update();
    }
    


   

    
    function Main():void{

        stage.removeAllChildren();

        switch(managers.Game.currentScene){
            case config.Scene.START:
            
            currentScene = new scenes.StartScene();
            
            
            break;
            case config.Scene.PLAY:
            //game play
            currentScene = new scenes.PlayScene();
            break;
            case config.Scene.OVER:
            //game over scene
            currentScene = new scenes.OverScene();
            break;
        }
        currentState = managers.Game.currentScene;
        stage.addChild(currentScene);

    }

    window.onload = Init;

})();