const stringBuilder = {
  id: "string-builder",
  title: "StringBuilder",
  description: "Learn about StringBuilder - faster alternative to StringBuffer",
  content: `
# StringBuilder in Java

StringBuilder is similar to StringBuffer but is **not synchronized**, making it faster for single-threaded applications.

## StringBuilder vs StringBuffer

| StringBuilder | StringBuffer |
|---------------|--------------|
| Not synchronized | Synchronized |
| Faster | Slower |
| Not thread-safe | Thread-safe |
| Single-threaded use | Multi-threaded use |

## When to Use

- **String**: Few modifications, need immutability
- **StringBuilder**: Many modifications, single thread
- **StringBuffer**: Many modifications, multiple threads
  `,
  code: `public class StringBuilderDemo {
    public static void main(String[] args) {
        System.out.println("=== StringBuilder Demo ===\\n");
        
        // Creating StringBuilder
        StringBuilder sb = new StringBuilder("Hello");
        System.out.println("Initial: " + sb);
        
        // Append
        sb.append(" World").append("!");
        System.out.println("After append: " + sb);
        
        // Insert
        sb.insert(5, " Java");
        System.out.println("After insert: " + sb);
        
        // Delete
        sb.delete(5, 10);
        System.out.println("After delete: " + sb);
        
        // Reverse
        sb.reverse();
        System.out.println("Reversed: " + sb);
        
        // Performance comparison
        System.out.println("\\n--- Performance Comparison ---");
        int iterations = 100000;
        
        // String concatenation
        long start = System.currentTimeMillis();
        String s = "";
        for (int i = 0; i < 1000; i++) {
            s += "a";
        }
        System.out.println("String (1000 iterations): " + (System.currentTimeMillis() - start) + "ms");
        
        // StringBuilder
        start = System.currentTimeMillis();
        StringBuilder sbPerf = new StringBuilder();
        for (int i = 0; i < iterations; i++) {
            sbPerf.append("a");
        }
        System.out.println("StringBuilder (100000 iterations): " + (System.currentTimeMillis() - start) + "ms");
        
        // StringBuffer
        start = System.currentTimeMillis();
        StringBuffer sbfPerf = new StringBuffer();
        for (int i = 0; i < iterations; i++) {
            sbfPerf.append("a");
        }
        System.out.println("StringBuffer (100000 iterations): " + (System.currentTimeMillis() - start) + "ms");
    }
}`,
  practiceQuestions: [
    {
      question: "Compare performance of String, StringBuilder, and StringBuffer",
      hint: "Use System.currentTimeMillis() to measure time",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int iterations = 10000;
        
        // Test String concatenation
        
        // Test StringBuilder
        
        // Test StringBuffer
        
    }
}`
    }
  ]
};

export default stringBuilder;





