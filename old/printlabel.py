import os
import binascii
import base64
import sys

filename = "pythonoutputdoc.txt"

def printLabelWithFontFromFile(iFilename, cpi, lpi):
    printCommand = "lpr -o landscape -o PageSize=24_mm__1___Label__Auto_ -o cpi=" + cpi + " -o lpi=" + lpi + " " + iFilename
    os.system(printCommand)

def printLabelWithFontFromText(writeText, cpi, lpi):
    printCommand = "lpr -o landscape -o PageSize=24_mm__1___Label__Auto_ " + filename
    doc = open("pythonoutputdoc.txt", "w")
    doc.write(writeText)
    doc.close()
    os.system(printCommand)

def printLabelPrompt():
    font = "x"
    orientation = "no"
    while not orientation.lower() == "portrait" and not orientation.lower() == "landscape":
        orientation = input("Landscape or portrait? ").lower()
        if orientation == "q" or orientation == "quit":
            os.system("cancel -a LabelWriter-400")
            sys.exit("No- please- don't kill me...")
    while not font.lower() == "y" and not font.lower() == "n":
        font = input("Set font size? (y/n) ")
        if font.lower() == "y":
            cpi = input("Columns per inch? ")
            lpi = input("Lines per inch? ")
            printCommand = "lpr -o " + orientation + " -o PageSize=24_mm__1___Label__Auto_ -o cpi=" + cpi + " -o lpi=" + lpi + " ~/Documents/Untangled2016/" + filename
        elif font.lower() == "n":
            printCommand = "lpr -o " + orientation + " -o PageSize=24_mm__1___Label__Auto_ ~/Documents/Untangled2016/" + filename

    doc = open("pythonoutputdoc.txt", "w")
    doc.write(input("What do you wanna print? "))
    doc.close()

    print("Printing...")
    os.system(printCommand)

def printLabelPromptBinary():
    font = "x"
    orientation = "no"
    while not orientation.lower() == "portrait" and not orientation.lower() == "landscape":
        orientation = input("Landscape or portrait? ").lower()
    while not font.lower() == "y" and not font.lower() == "n":
        font = input("Set font size? (y/n) ")
        if font.lower() == "y":
            cpi = input("Columns per inch? ")
            lpi = input("Lines per inch? ")
            printCommand = "lpr -o " + orientation + " -o PageSize=24_mm__1___Label__Auto_ -o cpi=" + cpi + " -o lpi=" + lpi + " ~/Documents/Untangled2016/" + filename
        elif font.lower() == "n":
            printCommand = "lpr -o " + orientation + " -o PageSize=24_mm__1___Label__Auto_ ~/Documents/Untangled2016/" + filename

    doc = open("pythonoutputdoc.txt", "w")
    raw = input("What do you wanna print in LabelScriptBin? ")
    sixtyfourraw = base64.b64encode(raw)
    binraw = binascii.a2b_base64(sixtyfourraw)
    final = binraw.replace("0","□")
    final = binraw.replace("1","■")
    doc.write(final)
    doc.close()

    print("Printing...")
    os.system(printCommand)

while True:
    printLabelPrompt()
