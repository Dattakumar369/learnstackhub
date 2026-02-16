const arrayMethods = {
  id: "array-methods",
  title: "Array Methods",
  description: "Learn useful array methods from Arrays class",
  content: `# Arrays Class Methods

The java.util.Arrays class provides useful methods for array manipulation.

## Common Methods

| Method | Description |
|--------|-------------|
| sort() | Sorts array |
| binarySearch() | Searches sorted array |
| fill() | Fills array with value |
| copyOf() | Copies array |
| equals() | Compares arrays |
| toString() | Converts to string |
  `,
  code: `import java.util.Arrays;

public class ArrayMethodsDemo {
    public static void main(String[] args) {
        System.out.println("=== Arrays Class Methods ===\\n");
        
        int[] arr = {5, 2, 8, 1, 9, 3};
        System.out.println("Original: " + Arrays.toString(arr));
        
        // Sort
        int[] sorted = arr.clone();
        Arrays.sort(sorted);
        System.out.println("Sorted: " + Arrays.toString(sorted));
        
        // Binary Search (on sorted array)
        int index = Arrays.binarySearch(sorted, 5);
        System.out.println("Index of 5: " + index);
        
        // Fill
        int[] filled = new int[5];
        Arrays.fill(filled, 7);
        System.out.println("Filled: " + Arrays.toString(filled));
        
        // Copy
        int[] copy = Arrays.copyOf(arr, 10);
        System.out.println("Copy (extended): " + Arrays.toString(copy));
        
        // Copy range
        int[] range = Arrays.copyOfRange(arr, 1, 4);
        System.out.println("Copy range [1,4): " + Arrays.toString(range));
        
        // Equals
        int[] arr2 = {5, 2, 8, 1, 9, 3};
        System.out.println("Arrays equal: " + Arrays.equals(arr, arr2));
        
        // Parallel sort (for large arrays)
        int[] large = new int[1000];
        for (int i = 0; i < large.length; i++) {
            large[i] = (int)(Math.random() * 1000);
        }
        Arrays.parallelSort(large);
        System.out.println("Parallel sorted (first 10): " + 
            Arrays.toString(Arrays.copyOf(large, 10)));
    }
}`,
  practiceQuestions: [
    {
      question: "Use Arrays methods to sort, search, and copy an array",
      hint: "Use Arrays.sort(), Arrays.binarySearch(), Arrays.copyOf()",
      starterCode: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {45, 12, 78, 34, 89, 23};
        
        // Sort the array
        
        // Search for 34
        
        // Copy first 3 elements
        
    }
}`
    }
  ]
};

export default arrayMethods;





