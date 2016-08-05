var PosX = 45, PosY = 70, Rotation = Math.PI/2;
var Cur = 0;
var Instructions = [];
var MaxAng = Math.PI/2;
var MoveScale = 0.5;
var BitCount = 4;


function Start(CSV, drawFunc) {
    Instructions = CSV.split(',');
    var Loops, LoopRoot;
    
    for(var i = 0; i < Instructions.length; i++) {
	var Cur = Instructions[i];

        if(Cur == 1) { // Move
            MoveBy(Instructions[i + 1]);
		console.log("->");
            i++;
        }

        if(Cur == 2) { // Rotate
            Rotation += parseFloat(ToRotAngle(Instructions[i + 1]));
		console.log(Rotation);
            i++;
        }
        if(Cur == 3) { // Loop
            Loops = Instructions[i + 1];
            LoopRoot = i + 1;
            i++;
        }
        if(Cur == 4) { // End Loop
            if(Loops != 0) {
                i = LoopRoot;
                Loops--;
            }
        }
        if(Cur == 5) { // Jump
            PosX += parseFloat(Instructions[i] + 1);
	    PosY += parseFloat(Instructions[i] + 2);
	    i += 2;
        }

	// you can define a draw function
	drawFunc();
    }
}

function ToRotAngle(Input) {
	var MaxAng = 1;
	var AngStep = MaxAng / Math.pow(2, BitCount);
	
	return -MaxAng + AngStep*Input;
}

function MoveBy(Ammount) {
    PosX += Math.sin(Rotation) * Ammount;
    PosY += Math.cos(Rotation) * Ammount;
}
