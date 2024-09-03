import os
points = 0

while True:
    playing2 = input("Press 'q' to quit: ")
    if playing2.lower() == "q":
        break  # Use break to exit the loop
        
    else:
        points += 1
        print(str(points) + " points")  # Convert points to a string for concatenation
os.system('cls' if os.name == 'nt' else 'clear')
