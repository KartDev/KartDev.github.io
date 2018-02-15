/* Calculating the number of waterbottle equivalent used during a shower
based on an assumed value of 12 bottles per 1 minute in the shower. 
Prompts user for minutes spent and, if valid entry, outputs bottled water equivalent. */
#include <stdio.h> // Uses CS50 libraries
#include <cs50.h>

int main(void)
{
    int n; // minutes
        do
        {
            printf("Minutes: "); // prompts user for minute input, repeats until positive int is inputted
            n = get_int();
        }
        while (n<=0);
 
    int x = n * 12; // Minutes in shower times 12 for number of Bottles (x) equivalent used
    printf("Minutes: %i\n", n);
    printf("Bottles: %i\n", x);
}