const sample_fib = "//Fibonacci\n\n" +
    "function fibonacci(num){\n" +
    "  var a = 1, b = 0, temp;\n" +
    "\n" +
    "  while (num >= 0){\n" +
    "    temp = a;\n" +
    "    a = a + b;\n" +
    "    b = temp;\n" +
    "    num--;\n" +
    "  }\n" +
    "\n" +
    "  return b;\n" +
    "}\n\n\n" +
    "fibonacci(10);"

const sample_math = "//Order of Operations\n\n(1+1)+1+2*3/4"

const foobar = "//Function Declarations\n\n" +
    "function foo(){\n" +
    " return \"hello\";\n" +
    "}\n" +
    "\n" +
    "function bar(){\n" +
    " return \"world\";\n" +
    "}\n" +
    "\n" +
    "let message = foo()+\",\"+bar();;\n" +
    "\n" +
    "console.log(message);"

const samplesLookup = {
    "fib":sample_fib,
    "pemdas":sample_math,
    "foobar":foobar
};