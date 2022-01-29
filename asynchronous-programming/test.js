async function serialFlow() {
      let result1 = await execute(1, 1);
      let result2 = await execute(2, 2);
      let result3 = await execute(3, 3);
      let finalResult = result1 + result2 + result3;
      console.log(finalResult);
    }