How to create a css variable to reuse it in any place 

- in to a CSS file , we have to write the :root{
    --variableName:value(like your choice);
    --variableName:value and so on
}

***
### New topic Aspect-Ratio 

- This is actually a css property to handle the height and width of  a particular element , how we use it 
 at first we have to define height or width of an element , to use this property like below.
```
h1{
    height:100%;
    aspect-ratio:1/4 (width/height) /*Now the height 100% so the width will take the 1part of its height , like 100/4 =25% so , final height will be 100% and final width will be 100%*/
}

p{
    width:100vw;
    aspect-ratio:4/3; so the calculation will be 100vh/4=25vh then the 3part that will be 3*25=75vh , now the final height =75vh and width will be:100vw; 
}
```