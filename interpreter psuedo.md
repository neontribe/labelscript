```
int PosX, PosY
float Rotation
int Cur
Array Instructions

function Start(string CSV) {
	Instructions = split(',', CSV);
	int Loops, LoopRoot;

	for(i = 0; i < Instuctions.Length; i++;) {
		if(Instuctions[i] == 1) { // Move
			MoveBy(Instuctions[i + 1]);
			i++;
		}

		if(Instuctions[i] == 2) { // Rotate
			Rotation += Instuctions[i + 1];
			i++;
			LoopRoot = i + 1;
		}
		if(Instuctions[i] == 3) { // Loop
			Loops = Instuctions[i + 1];
			i++;
		}
		if(Instuctions[i] == 34) { // End Loop
			if(LoopRoot != 0) {
				i = LoopRoot;
				Loops--;
			}
			i++;
		}
	}
}

function MoveBy(Ammount) {
	PosX += Cos(Rotation) * Ammount;
	PosY += Sin(Rotation) * Ammount;
}
```
