// Full Function Countdown Script 
// Written by Jason Vore - codered10@hotmail.com
//
// Edited by Nathaniel Schweinberg - nathaniel@ftcmedia.com
// 2010-04-28
// https://forums.creativecow.net/readpost/227/15504
// 
// Modified for hours and days; coding style updates by Mark Boszko
// v1.5, 2017-06-12
// local variables use underscore_names to contrast with expressionLayerAttributes
// 
// USAGE:
// Attach as an expression for the source text for a Text Layer. 
// 

//////////
// 
// ATTRIBUTES
// 
// Edit these attributes to adjust the timer for your use
// 

// How many days, hours, minutes, and seconds you want to count down.
days_to_count = 253;
hours_to_count = 17;
minutes_to_count = 01;
seconds_to_count = 57;

// TODO: Enable calculation of days and hours.
//       For the moment, the display is faked with the input values

// Number of seconds to hold the countdown timer at full 
// before it starts counting down 
offset_seconds = 0;

include_zero_segments = true;  // true to include minutes, hours, or days, even if they have counted down to zero
include_decimal_seconds = false;  // true to include decimal parts of seconds, false to exclude 
decimal_places = 2;  // Number of decimal places to include (int)
allow_negative_times = false;	 // true to allow the countdown to run past 0, false to hold the timer at 0 seconds. 
include_leading_zeroes = true;	 // true to include leading zeroes in front of minutes to keep text in same location 


//////////
// 
// Time code calculations
// 

// the "time" to actually start the countdown
i = inPoint + offset_seconds;   
//calculate total seconds in the countdown 
seconds_to_count = minutes_to_count * 60 + seconds_to_count;
// decimal (float) of number of seconds remaining
// uses i start the countdown at the inpoint of the clip 
seconds_remaining = seconds_to_count - time + i; 

if (seconds_remaining > seconds_to_count) 
{ 
    // If we haven't gotten out of the offset_seconds period,
    // reset the timer to full.
    seconds_remaining = seconds_to_count;
} 

if(!allow_negative_times) 
{ 
    // If we've passed zero seconds and user has chosen
    // not to allow negative times, reset time to 0. 
    if(seconds_remaining < 0) seconds_remaining = 0;	 
} 

// Calculate number of minutes (int) remaining 
minutes_remaining = Math.floor(seconds_remaining / 60); 
//reduces seconds to less than 60
decimal_seconds_remaining = seconds_remaining - 60 * minutes_remaining;  

// Multiplier for placing decimal place in the correct spot
decimal_multiple = Math.pow(10, decimal_places);
// move decimal to the right and chops remainder
decimal_seconds_remaining = Math.floor(decimal_seconds_remaining * decimal_multiple);
// prepare the seconds for display - puts the decimal point back where it belongs
display_seconds_remaining = decimal_seconds_remaining / decimal_multiple;	  

// FIXME: This does not work
if (0 == decimal_seconds_remaining % decimal_multiple && include_decimal_seconds) 
{ 
    // If we are at an even second and the user wants the decimal places 
    // displayed, tag the decimal point on to the string. 
    display_seconds_remaining = display_seconds_remaining + ".";
} 

if(include_decimal_seconds) 
{ 
    for (a = 1; a <= decimal_places; a++) 
    { 
        if(!(decimal_seconds_remaining % Math.pow(10, a))) 
        { 
        // Add appropriate trailing zeroes if we are showing decimals.
        // FIXME: This does not work
        display_seconds_remaining = display_seconds_remaining + "0"; 
        } 
    } 
} 


if(decimal_seconds_remaining < decimal_multiple * 10 && include_zero_segments)
{ 
    // if we are under 10 seconds and displaying minutes, 
    // add a leading 0 to the seconds 
    display_seconds_remaining = '0' + display_seconds_remaining; 
} 

if(include_zero_segments && minutes_to_count >= 0 && minutes_remaining < 10 && include_leading_zeroes) 
{ 
    display_minutes_remaining = '0' + minutes_remaining; 
} else { 
    display_minutes_remaining = minutes_remaining; 
} 

// Final display string
days_to_count + ":" + hours_to_count + ":" + display_minutes_remaining + ':' + display_seconds_remaining