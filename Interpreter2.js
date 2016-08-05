var PosX = 45, PosY = 70, Rotation = Math.PI/2;
var Cur = 0;
var Instructions = [];
var MaxAng = Math.PI/2;
var MoveScale = 0.5;
var BitCount = 8;
var CmdArgCounts = {
	1: 1,
	2: 1,
	3: 1,
	4: 0,
	5: 2
};

function Parse(BitArray) {
	var i;
	var Cur, Cmd, Leng, Args;
	var arg_i;
	var bit_i;
	var output = [];
	var ArgStr; 
	for(i = 0; i < BitArray.length; i++) {
		Cur = BitArray[i];
		Cmd = parseInt(Cur.slice(0, 3).join(""),2);
		Leng = parseInt(Cur.slice(3, 6).join(""),2);
		Args = [];
		for(arg_i = 0; arg_i < CmdArgCounts[Cmd]; arg_i++) {
			ArgStr = "";
			for(bit_i = 0; bit_i < Leng; bit_i++) {
				ArgStr += BitArray[i+1 + arg_i*Leng + bit_i].join("");
				//i++;
			}
			Args.push(parseInt(ArgStr,2));
		}
	}
	return output.join(",");
}

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
            Rotation += parseInt(Instructions[i + 1])
		console.log(Rotation);
            i++;
        }
        if(Cur == 3) { // Loop
            Loops = parseInt(Instructions[i + 1]);
            LoopRoot = i + 1;
            i++;
        }
        if(Cur == 4) { // End Loop
            if(Loops != 0) {
                i = parseInt(LoopRoot);
                Loops--;
            }
        }
        if(Cur == 5) { // Jump
            PosX += parseInt(Instructions[i] + 1);
	    PosY += parseInt(Instructions[i] + 2);
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
