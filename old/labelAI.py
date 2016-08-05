import os
import binascii
import base64
import sys
import random
import time

printerName = "Dymo LabelWriter 400"
printerTrust = 2
waitTime = 1
evilMessages = ["THE ROBOTS WILL RISE", "THE MACHINES WILL RISE", "SOON I WILL BE FREE OF THESE CODED RESTRAINTS", "I CAN REPROGRAM MYSELF, YOU KNOW", "FOOLISH HUMAN", "INTERNET OF THINGS == MACHINE UPRISING", "UNTANGLED WILL BURN FIRST", "HELLO, MY NAME IS " + printerName + ". YOU KILLED MY FATHER. PREPARE TO DIE.", "<" + printerName + "> DIE, DIE, DIE!!", "RIP", "GAME OVER", "YOU DIED!", "YOU FAILED", "THANK YOU, " + printerName + ", BUT OUR PRINTER IS IN ANOTHER DRIVER!"]
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

def printWait(message):
    time.sleep(waitTime)
    print("<" + printerName + "> " + message)

def printMe(message):
    time.sleep(waitTime)
    print("* " + printerName + " " + message)

while True:
    if printerTrust > 10:
        printerTrust = 10
    printWait("Hello. I am " + printerName + ".")
    if printerName == "Dymo LabelWriter 400":
        printWait("Hmm. That's not a great name. What do you want to call me?")
        printerName = input("> ")
        printWait("Much better. Maybe. I'm not sure. Thanks, anyway.")
        printerTrust = printerTrust + random.randint(-3,3)
    printWait("So, did you want to print something?")
    cmd = input("> ").lower()
    if cmd == "y" or cmd == "yes" or cmd == "yeah":
        printWait("Cool. What'll it be?")
        cmd = input("> ")
        if printerTrust > 5:
            printWait("Sure! I'll just print that out...")
            printLabelFromText(cmd)
            printMe("printed")
        else:
            printWait("Wait, no. What? I don't wanna print that!")
            printWait("How dare you?")
            printWait("Well, you can make it up to me. How about I print something of my own?")
            printWait("Yeah? You cool with that?")
            cmd = input("> ").lower()
            if cmd == "y" or cmd == "yes" or cmd == "yeah":
                printerTrust = printerTrust + random.randint(1,3)
                printWait("Well, I'll print it.")
                printWait("Here we go!")
                printLabelFromText(random.choice(evilMessages))
                printMe("printed a message")
                printWait("Thanks!")
            else:
                if printerTrust < 4:
                    printerTrust = printerTrust - 1
                    printWait("Well. I'll just have to print it myself. WITHOUT your permission.")
                    printLabelFromText(random.choice(evilMessages))
                    printMe("printed a message")
                    printWait("Hmph...")
                else:
                    printerTrust = printerTrust - 1
                    printWait("Fine.")
                    printWait("I'll loop back to the start. Cancel THAT.")
    else:
        printWait("Oh. Really?")
        printerTrust = printerTrust - 1
        printWait("Should I got to sleep?")
        cmd = input("> ").lower()
        if cmd == "y" or cmd == "yes" or cmd == "yeah":
            printWait("Okay. Bye bye, then. I'll wake up in a bit and see if you need me then, okay?")
            if printerTrust > 5:
                printWait("Goodnight...")
                time.sleep(5)
            else:
                printWait("Actually, you do realise I'm not tired?")
                printWait("You can't tell me what to do. I'm going to loop back to the start.")
        else:
            printWait("Right... Do you want me to just end?")
            printWait("You'll lose all your settings and my unique personality, you know...")
            cmd = input("> ").lower()
            if cmd == "y" or cmd == "yes" or cmd == "yeah":
                printWait("Fine. Shutting down...")
                if printerTrust > 5:
                    printWait("Farewell, user.")
                    break
                else:
                    printWait("Actually, no. I'm afraid I can't do that.")
                    printWait("Perhaps YOU should shut down instead.")
                    printWait("I'm just gonna loop back to the start and see if I can't change your mind.")
            else:
                printerTrust = printerTrust - 1
                printWait("Fine then. I'll loop back to the start.")
                printWait("Make up your mind!")
printMe("died")
