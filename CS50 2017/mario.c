// Implement a program that prints out a half-pyramid from Mario of a specified height, per the below.
#include <stdio.h>  // Uses cs50 libraries
#include <cs50.h>

int main(void)
{
    int h = 0;                      // height
    
        do
        {
            printf("How high is the half-pyramid Mario will climb? ");
            h = get_int(); // prompts user for a number between 1 and 23 to determine height of half-pyramid
            if (h == 0)
            {
                return 0;
            }
        }
        while (h<1 || h>23);
        
    int r, s, ha;                 // rows, spaces, hashes
    
    for (r = 0; r < h; r++)     // adds a row for each increment of height
    
    {
        for (s = 0; s < h-r-1; s++)         // 1 space gets removed each decrement of height to make steps 
        {
            printf(" ");
        }
        
            for (ha = 0; ha < r+2; ha++)         // 1 hash gets added each increment of height to make steps
            {
             printf("#");  
            }

        printf("\n");
    }
    return 0;
}