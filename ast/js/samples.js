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
    "}"

const sample_math = "//Order of Operations\n\n(1+1)+1+2*3/4"


const samplesLookup = {
    "fib":sample_fib,
    "pemdas":sample_math
};