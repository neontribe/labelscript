Basics:

 ■ □ There are 2 shades for each block, white = 0 black = 1, there is 8 blocks in a column
	 2^8 gives us values of 0 - 255. Each command is represented by a
	 value, this command is followed by a signed int from -127 - 127
	 which specifies the ammount it should be moved/rotated by. The
	 stop command ends the program.

Commands:

 # 0 Stop  
	 Stops the program

 # 1 Rotate  
	 Rotates the turtle by the amount specified in the next block  
	 The amount is affected by the scale amount  

 # 2 Move  
	 Moves forward in by the amount specified  
	 The amount is affected by the scale amount  

 # 3 Scale  
	 Changes the amount that the rotations and moves will be scaled by  

