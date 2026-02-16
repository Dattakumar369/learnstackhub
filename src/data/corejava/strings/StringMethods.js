const stringMethods = {
  id: "string-methods",
  title: "String Methods",
  description: "Learn commonly used String methods in Java",
  content: `
# String Methods in Java

Java String class provides many methods to perform operations on strings.

## Common String Methods

| Method | Description |
|--------|-------------|
| length() | Returns string length |
| charAt(i) | Returns character at index |
| substring() | Extracts substring |
| concat() | Concatenates strings |
| equals() | Compares content |
| equalsIgnoreCase() | Case-insensitive comparison |
| toUpperCase() | Converts to uppercase |
| toLowerCase() | Converts to lowercase |
| trim() | Removes whitespace |
| split() | Splits string |
| replace() | Replaces characters |
| contains() | Checks if contains substring |
| startsWith() | Checks prefix |
| endsWith() | Checks suffix |
| indexOf() | Finds index of substring |
  `,
  code: `public class StringMethodsDemo {
    public static void main(String[] args) {
        System.out.println("=== String Methods Demo ===\\n");
        
        String str = "  Hello, Java World!  ";
        
        // Basic operations
        System.out.println("--- Basic Operations ---");
        System.out.println("Original: '" + str + "'");
        System.out.println("Length: " + str.length());
        System.out.println("Trimmed: '" + str.trim() + "'");
        
        str = str.trim();
        
        // Character operations
        System.out.println("\\n--- Character Operations ---");
        System.out.println("charAt(0): " + str.charAt(0));
        System.out.println("indexOf('Java'): " + str.indexOf("Java"));
        System.out.println("lastIndexOf('o'): " + str.lastIndexOf('o'));
        
        // Case conversion
        System.out.println("\\n--- Case Conversion ---");
        System.out.println("Upper: " + str.toUpperCase());
        System.out.println("Lower: " + str.toLowerCase());
        
        // Substring
        System.out.println("\\n--- Substring ---");
        System.out.println("substring(0, 5): " + str.substring(0, 5));
        System.out.println("substring(7): " + str.substring(7));
        
        // Replace
        System.out.println("\\n--- Replace ---");
        System.out.println("Replace 'Java' with 'Python': " + str.replace("Java", "Python"));
        System.out.println("Replace all 'o' with '0': " + str.replace('o', '0'));
        
        // Check methods
        System.out.println("\\n--- Check Methods ---");
        System.out.println("contains('Java'): " + str.contains("Java"));
        System.out.println("startsWith('Hello'): " + str.startsWith("Hello"));
        System.out.println("endsWith('!'): " + str.endsWith("!"));
        System.out.println("isEmpty(): " + str.isEmpty());
        
        // Split
        System.out.println("\\n--- Split ---");
        String[] words = str.split(" ");
        System.out.println("Words:");
        for (String word : words) {
            System.out.println("  - " + word);
        }
        
        // Comparison
        System.out.println("\\n--- Comparison ---");
        String s1 = "Hello";
        String s2 = "hello";
        System.out.println("equals: " + s1.equals(s2));
        System.out.println("equalsIgnoreCase: " + s1.equalsIgnoreCase(s2));
        System.out.println("compareTo: " + s1.compareTo(s2));
    }
}`,
  practiceQuestions: [
    {
      question: "Write a program to count vowels and consonants in a string",
      hint: "Use charAt() and check each character",
      starterCode: `public class Main {
    public static void main(String[] args) {
        String str = "Hello World";
        int vowels = 0, consonants = 0;
        
        // Count vowels and consonants
        
        System.out.println("Vowels: " + vowels);
        System.out.println("Consonants: " + consonants);
    }
}`
    }
  ]
};

export default stringMethods;





