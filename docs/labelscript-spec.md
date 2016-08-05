#Basics

 ■ □ There are 2 shades for each block, white = 0 black = 1, there are 6 blocks in a column. 
 	Each command is contains a header column with 3 bits reserved for the command and 3 bits reserved for the length of the subsequent data.

#Commands

1. Move  
Moves forward in by the amount specified  
The amount is affected by the scale amount
	 
2. Rotate  
Rotates by the amount specified in the next block  

3. Loop  
Loops by the specified number, must be followed by a EndLoop

4. EndLoop  
Goes back to the loop and decrements the loop counter by 1
 	
5. Jump  
Move without drawing, see Move
 	
You can change some var's before running Start(), you can use this to change the starting position, angle, max turn angle or number of bits expected.
 
##List

   PosX  
   PosY  
   Rotation  
   MaxAng (radians)  
   MoveScale  
   BitCount  
