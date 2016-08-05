import os
import binascii
import base64
import sys
import random
import time

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

def printLabelFromText(writeText):
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

def setRandomBinSquares(var):
    var = random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"])
    var = var.replace("0","□")
    var = var.replace("1","■")

os.system("cancel -a LabelWriter-400")
while True:
    cmdA = random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"])
    cmdB = random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"])
    cmdC = random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"])
    cmdD = random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"])
    cmdE = random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"])
    cmdF = random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"]) + " " + random.choice(["0","1"])
    cmdA = cmdA.replace("0","□")
    cmdA = cmdA.replace("1","■")
    cmdB = cmdB.replace("0","□")
    cmdB = cmdB.replace("1","■")
    cmdC = cmdC.replace("0","□")
    cmdC = cmdC.replace("1","■")
    cmdD = cmdD.replace("0","□")
    cmdD = cmdD.replace("1","■")
    cmdE = cmdE.replace("0","□")
    cmdE = cmdE.replace("1","■")
    cmdF = cmdF.replace("0","□")
    cmdF = cmdF.replace("1","■")
    cmdFull = "――――――――――――――――" + os.linesep + cmdA + os.linesep + cmdB + os.linesep + cmdC + os.linesep + cmdD + os.linesep + cmdE + os.linesep + cmdF
    print(cmdFull)
    print()
    printLabelFromText(cmdFull)
    time.sleep(6)
