# FCCopenWeather
FCC Open Weather app by Samatar, Harry and E

In order to save on API calls I have commented out the promise chain ( line 33 - 56 ) and replaced jsonObject with my own custom weather object (the weather for where I live). Feel free to change this custom object as you wish!!
(this will break the functionality of the change-units button, since the units are applied in the API call, but it is working don't worry!)
* some quick clarification * you only get a limited number of API calls to open weather, and i assume that if 3 of us are editing at the same time it will be easier to max out the number. by putting in a custom object you should still be able to test the functionality (with manually changing the variables) without going over the allotted api limit.
