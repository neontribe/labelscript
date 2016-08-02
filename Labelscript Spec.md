Basics:

 █ ▓ ▒ ░ There are 4 shades for each block, there is 4 blocks in a column
	 4^4 gives us values of 0 - 255. Each command is represented by a
	 value, this command is followed by a signed int from -127 - 127
	 which specifies the ammount it should be moved/rotated by. The
	 stop command ends the program.

Commands:

 # 0 Stop  
	 Stops the program

 # 1 Rotate  
	 Rotates the turtle by the ammount specified in the next block  
	 The ammount is affected by the scale ammount  

 # 2 Move  
	 Moves forward in by the ammount specified  
	 The ammount is affected by the scale ammount  

 # 3 Scale  
	 Changes the ammount that the rotations and moves will be scaled by  

