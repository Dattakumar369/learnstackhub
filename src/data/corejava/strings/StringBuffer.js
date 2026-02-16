const stringBuffer = {
  id: "string-buffer",
  title: "StringBuffer",
  description: "Learn about mutable StringBuffer class in Java",
  content: `
# StringBuffer in Java

StringBuffer is a mutable sequence of characters. Unlike String, StringBuffer can be modified without creating new objects.

## Key Features

- **Mutable**: Can be modified
- **Thread-safe**: Synchronized methods
- **Efficient**: For frequent modifications

## StringBuffer vs String

| String | StringBuffer |
|--------|--------------|
| Immutable | Mutable |
| Creates new objects | Modifies same object |
| Not synchronized | Synchronized |
| Faster for few operations | Faster for many modifications |

## Common Methods

| Method | Description |
|--------|-------------|
| append() | Adds to end |
| insert() | Inserts at position |
| delete() | Removes characters |
| reverse() | Reverses string |
| replace() | Replaces substring |
| capacity() | Returns capacity |
  `,
  code: `public class StringBufferDemo {
    public static void main(String[] args) {
        System.out.println("=== StringBuffer Demo ===\\n");
        
        // Creating StringBuffer
        StringBuffer sb = new StringBuffer("Hello");
        System.out.println("Initial: " + sb);
        System.out.println("Capacity: " + sb.capacity());
        System.out.println("Length: " + sb.length());
        
        // Append
        System.out.println("\\n--- Append ---");
        sb.append(" World");
        System.out.println("After append: " + sb);
        sb.append(123);
        System.out.println("After append int: " + sb);
        
        // Insert
        System.out.println("\\n--- Insert ---");
        sb.insert(5, " Java");
        System.out.println("After insert: " + sb);
        
        // Delete
        System.out.println("\\n--- Delete ---");
        sb.delete(5, 10);
        System.out.println("After delete: " + sb);
        
        // Reverse
        System.out.println("\\n--- Reverse ---");
        StringBuffer sb2 = new StringBuffer("Hello");
        sb2.reverse();
        System.out.println("Reversed: " + sb2);
        
        // Replace
        System.out.println("\\n--- Replace ---");
        StringBuffer sb3 = new StringBuffer("Hello World");
        sb3.replace(6, 11, "Java");
        System.out.println("After replace: " + sb3);
        
        // Chaining methods
        System.out.println("\\n--- Method Chaining ---");
        StringBuffer sb4 = new StringBuffer();
        sb4.append("Hello").append(" ").append("World").reverse();
        System.out.println("Chained result: " + sb4);
        
        // Performance comparison
        System.out.println("\\n--- Performance Demo ---");
        long start = System.currentTimeMillis();
        StringBuffer sbPerf = new StringBuffer();
        for (int i = 0; i < 10000; i++) {
            sbPerf.append("a");
        }
        long end = System.currentTimeMillis();
        System.out.println("StringBuffer time: " + (end - start) + "ms");
    }
}`,
  practiceQuestions: [
    {
      question: "Write a program to reverse a string using StringBuffer",
      hint: "Use StringBuffer's reverse() method",
      starterCode: `public class Main {
    public static void main(String[] args) {
        String original = "Hello Java";
        
        // Reverse using StringBuffer
        
        System.out.println("Original: " + original);
        System.out.println("Reversed: " + reversed);
    }
}`
    }
  ]
};

export default stringBuffer;





