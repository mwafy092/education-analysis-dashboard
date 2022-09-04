## How i crafted this project

1. I created separate folders for components, reducers, styles,tests and assets.
2. Everything is connected together using Redux toolkit
3. I created a separated types file inside reducers folder and i will keep update it to include more types

## problems i found:

1. After Filtering data i found the some schools within the same camp and same month have 2 values .
   so i decided to let them and not merge them together as we can in the future add feature for weeks and days so we can know on which date within the same month we had this change

2. Managing state was so hard so i used Redux toolkit all around with advanced selectors to select all the data i need

3. some elements need to have more advanced types so i keep updating my projects in order to overcome assigned (any) value to values and states

### Conclusion

I enjoyed too much this project and i will keep adding more features to it in the future
