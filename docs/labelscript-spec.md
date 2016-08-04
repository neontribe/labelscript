Basics:

 ■ □ There are 2 shades for each block, white = 0 black = 1, there is 8 blocks in a column
	 2^8 gives us values of 0 - 255. Each command is represented by a
	 value, this command is followed by a signed int from -127 - 127
	 which specifies the ammount it should be moved/rotated by. The
	 stop command ends the program.

Commands:

 # 1 Move  
	 Moves forward in by the amount specified  
	 The amount is affected by the scale amount
	 
  # 2 Rotate  
	 Rotates the turtle by the amount specified in the next block  
	 The amount is calculated by the midpoint being no change in angle and 0 being maximum turn left and 255 being maximum turn right.

 # 3 Loop  
 	Loops by the specified number, must be followed by a EndLoop

 # 4 EndLoop  
 	Goes back to the loop and decrements the loop counter by 1
 	
 # 5 Jump  
 	Jumps by the specified X and Y ignoring angles (takes 2 args) 
 	
 You can change some var's before running Start(), you can use this to change the starting position, angle, max turn angle or number of bits expected.
 
 List:
   PosX
   PosY
   Rotation
   MaxAng (radians)
   MoveScale
   BitCount
