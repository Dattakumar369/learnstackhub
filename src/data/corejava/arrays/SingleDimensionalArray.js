const singleDimensionalArray = {
  id: "single-dimensional-array",
  title: "Single Dimensional Array",
  description: "Learn operations on single dimensional arrays",
  content: `# Single Dimensional Array

A single dimensional array is a linear collection of elements of the same type.

## Common Operations

- Traversal
- Insertion
- Deletion
- Searching
- Sorting
- Reversing
  `,
  code: `import java.util.Arrays;

public class SingleDimensionalArrayDemo {
    public static void main(String[] args) {
        System.out.println("=== Single Dimensional Array ===\\n");
        
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original: " + Arrays.toString(arr));
        
        // Find max and min
        int max = arr[0], min = arr[0];
        for (int num : arr) {
            if (num > max) max = num;
            if (num < min) min = num;
        }
        System.out.println("Max: " + max + ", Min: " + min);
        
        // Reverse array
        System.out.println("\\n--- Reverse Array ---");
        int[] reversed = new int[arr.length];
        for (int i = 0; i < arr.length; i++) {
            reversed[i] = arr[arr.length - 1 - i];
        }
        System.out.println("Reversed: " + Arrays.toString(reversed));
        
        // Linear search
        System.out.println("\\n--- Linear Search ---");
        int searchFor = 25;
        int foundAt = -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == searchFor) {
                foundAt = i;
                break;
            }
        }
        System.out.println(searchFor + " found at index: " + foundAt);
        
        // Sorting (Bubble Sort)
        System.out.println("\\n--- Bubble Sort ---");
        int[] sortArr = arr.clone();
        for (int i = 0; i < sortArr.length - 1; i++) {
            for (int j = 0; j < sortArr.length - i - 1; j++) {
                if (sortArr[j] > sortArr[j + 1]) {
                    int temp = sortArr[j];
                    sortArr[j] = sortArr[j + 1];
                    sortArr[j + 1] = temp;
                }
            }
        }
        System.out.println("Sorted: " + Arrays.toString(sortArr));
        
        // Copy array
        System.out.println("\\n--- Copy Array ---");
        int[] copy = Arrays.copyOf(arr, arr.length);
        System.out.println("Copy: " + Arrays.toString(copy));
    }
}`,
  practiceQuestions: [
    {
      question: "Write a program to reverse an array without using extra array",
      hint: "Swap elements from start and end moving towards center",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        
        // Reverse in place
        
    }
}`
    }
  ]
};

export default singleDimensionalArray;





