using System;
using System.Drawing;

namespace ImageReader
{
	class MainClass
	{
		string ImageFolder = @"Images/";
		int XNum, YNum;
		int XStep, YStep;
		Rectangle DataArea = new Rectangle (0, 0, 600, 300); // <<< Add rectangle

		public static void Main (string[] args)
		{
			if (args.Length == 2) {
				YNum = Convert.ToInt32 (args [1]);
				XNum = Convert.ToInt32 (args [0]);
			}

			var Images = Directory.GetFiles(".png").OrderBy(f => f);

			foreach (var file in Images) {
				Bitmap Img = new Bitmap (file);

				Console.WriteLine(ReadImage (Img));
			}
		}

		private string ReadImage(Bitmap RawImg){
			var RetString = String.Empty;
			var Img = RawImg.Clone (ImageArea, RawImg.PixelFormat) as Bitmap;

			XStep = Img.Width / XNum;
			YStep = Img.Height / (YNum + 1);

			for (int i = 0; i < XNum; i++) {
				RetString += ReadCol + ",";
			}

			return RetString.Trim (',');
		}

		private int ReadCol(Bitmap Img, int X){
			var col = String.Empty;

			col += ReadBox(Img, X, 0) * 1;

			return Convert.ToInt32 (col, 2);
		}

		private string ReadBox (Bitmap Img, int X, int Y){
			var Pixel = Img.GetPixel (X * XStep, Y * YStep);
			var GrayPix = Pixel.GetBrightness ();

			if (GrayPix < 64)
				return "00";
			if (GrayPix < 128)
				return "10";
			if (GrayPix < 196)
				return "01";
			else
				return "11";
		}
	}
}
