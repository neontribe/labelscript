var PosX = 0, PosY = 0, Rotation = 0;
var Cur = 0;
var Instructions = [];

// Format is CSV "3,3,1,5,4"

function Start(CSV) {
    Instructions = CSV.split(',');
    var Loops, LoopRoot;
    
    for(var i = 0; i < Instructions.length; i++) {
        if(Instructions[i] == 1) { // Move
            MoveBy(Instructions[i + 1]);
            i++;
        }

        if(Instructions[i] == 2) { // Rotate
            Rotation += Instructions[i + 1];
            i++;
        }
        if(Instructions[i] == 3) { // Loop
            Loops = Instructions[i + 1];
            LoopRoot = i + 1;
            i++;
        }
        if(Instructions[i] == 4) { // End Loop
            if(Loops != 0) {
                i = LoopRoot;
                Loops--;
            }
            else {
                i++;
            }
        }
	// You must define a "Draw" Function
	Draw();
    }
}

function MoveBy(Ammount) {
    PosX += Math.cos(Rotation) * Ammount;
    PosY += Math.sin(Rotation) * Ammount;
}
