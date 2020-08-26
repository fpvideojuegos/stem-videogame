var pBody = document.body;
            
// ****************************************************************
// LOGIN
if(GJAPI.bActive)
{
    
        
        // ****************************************************************
        // TROPHY
        GJAPI.TrophyAchieve(126768);
        
        
        // ****************************************************************
        // SCORE
        var iNewScore = Math.floor(Math.random() * 10000);
        
        GJAPI.ScoreAdd(532881, iNewScore, iNewScore + " points", null);
    
}
else {    
    console.log("No GameJolt Logged");
}


