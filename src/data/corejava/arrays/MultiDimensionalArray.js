const multiDimensionalArray = {
  id: "multi-dimensional-array",
  title: "Multi-Dimensional Array",
  description: "Learn about 2D arrays and matrices in Java",
  content: `# Multi-Dimensional Arrays

A multi-dimensional array is an array of arrays. The most common is the 2D array (matrix).

## 2D Array Declaration

\`\`\`java
int[][] matrix = new int[3][4]; // 3 rows, 4 columns
int[][] matrix = {{1,2,3}, {4,5,6}, {7,8,9}};
\`\`\`
  `,
  code: `public class MultiDimensionalArrayDemo {
    public static void main(String[] args) {
        System.out.println("=== Multi-Dimensional Array ===\\n");
        
        // 2D Array
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        
        // Print matrix
        System.out.println("--- Matrix ---");
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
        
        // Sum of all elements
        int sum = 0;
        for (int[] row : matrix) {
            for (int val : row) {
                sum += val;
            }
        }
        System.out.println("Sum: " + sum);
        
        // Transpose
        System.out.println("\\n--- Transpose ---");
        int[][] transpose = new int[3][3];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                transpose[j][i] = matrix[i][j];
            }
        }
        for (int[] row : transpose) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
        
        // Jagged Array
        System.out.println("\\n--- Jagged Array ---");
        int[][] jagged = {
            {1, 2},
            {3, 4, 5},
            {6}
        };
        for (int[] row : jagged) {
            for (int val : row) {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}`,
  practiceQuestions: [
    {
      question: "Write a program to multiply two matrices",
      hint: "Result[i][j] = sum of (A[i][k] * B[k][j]) for all k",
      starterCode: `public class Main {
    public static void main(String[] args) {
        int[][] A = {{1, 2}, {3, 4}};
        int[][] B = {{5, 6}, {7, 8}};
        
        // Multiply matrices
        
    }
}`
    }
  ]
};

export default multiDimensionalArray;





