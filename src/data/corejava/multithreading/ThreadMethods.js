const threadMethods = {
  id: "thread-methods",
  title: "Thread Methods",
  description: "Learn important thread methods in Java",
  content: `# Thread Methods

## Important Methods

| Method | Description |
|--------|-------------|
| start() | Start thread execution |
| run() | Entry point for thread |
| sleep(ms) | Pause execution |
| join() | Wait for thread to finish |
| yield() | Give up CPU |
| interrupt() | Interrupt thread |
| isAlive() | Check if running |
| setName() | Set thread name |
| setPriority() | Set priority (1-10) |
  `,
  code: `public class ThreadMethodsDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Thread Methods Demo ===\\n");
        
        // sleep() method
        System.out.println("--- sleep() ---");
        Thread sleepThread = new Thread(() -> {
            System.out.println("Sleeping for 500ms...");
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                System.out.println("Sleep interrupted!");
            }
            System.out.println("Woke up!");
        });
        sleepThread.start();
        sleepThread.join();
        
        // join() method
        System.out.println("\\n--- join() ---");
        Thread t1 = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("T1: " + i);
                try { Thread.sleep(100); } catch (Exception e) {}
            }
        });
        
        Thread t2 = new Thread(() -> {
            try {
                t1.join(); // Wait for t1 to complete
            } catch (InterruptedException e) {}
            System.out.println("T2: Started after T1 completed");
        });
        
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        
        // Priority
        System.out.println("\\n--- Priority ---");
        Thread lowPriority = new Thread(() -> {
            System.out.println("Low priority thread running");
        });
        Thread highPriority = new Thread(() -> {
            System.out.println("High priority thread running");
        });
        
        lowPriority.setPriority(Thread.MIN_PRIORITY);
        highPriority.setPriority(Thread.MAX_PRIORITY);
        
        System.out.println("Low priority: " + lowPriority.getPriority());
        System.out.println("High priority: " + highPriority.getPriority());
        
        lowPriority.start();
        highPriority.start();
        lowPriority.join();
        highPriority.join();
        
        // interrupt() method
        System.out.println("\\n--- interrupt() ---");
        Thread interruptThread = new Thread(() -> {
            try {
                System.out.println("Thread sleeping...");
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                System.out.println("Thread was interrupted!");
            }
        });
        
        interruptThread.start();
        Thread.sleep(100);
        interruptThread.interrupt();
        interruptThread.join();
        
        // yield() method
        System.out.println("\\n--- yield() ---");
        Thread yieldThread = new Thread(() -> {
            for (int i = 1; i <= 3; i++) {
                System.out.println("Yield thread: " + i);
                Thread.yield(); // Give chance to other threads
            }
        });
        yieldThread.start();
        yieldThread.join();
        
        // isAlive() method
        System.out.println("\\n--- isAlive() ---");
        Thread aliveThread = new Thread(() -> {
            try { Thread.sleep(200); } catch (Exception e) {}
        });
        System.out.println("Before start: " + aliveThread.isAlive());
        aliveThread.start();
        System.out.println("After start: " + aliveThread.isAlive());
        aliveThread.join();
        System.out.println("After join: " + aliveThread.isAlive());
    }
}`,
  practiceQuestions: [
    {
      question: "Create a countdown timer using thread sleep",
      hint: "Use Thread.sleep(1000) for 1 second delay",
      starterCode: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        // Create countdown from 10 to 0
        
    }
}`
    }
  ]
};

export default threadMethods;





