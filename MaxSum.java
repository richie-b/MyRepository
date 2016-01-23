public class MaxSum {
	
	public static void main(String[] args){
		
		/* Question Description: Write a function that, given a list 
		 * of integers (both positive and negative) returns the sum 
		 * of the contiguous subsequence with maximum sum. 
		 * Thus, given the sequence (1, 2, -4, 1, 3, -2, 3, -1) it should return 5. 
		 */
		
		System.out.println("Max is : " + findMax());
		
	}
	
	
	//move left pointer to current if its less than 0
	public static int findMax() {
		
		int[] data = {1, 2, -4, 1, 3, -2, 3, -1};

		int lPointer = 0;
		int rPointer = 0;
		int maxSum = 0;
		
	    while (true){
	        rPointer++;
	        int currentSum = findSum(data, lPointer, rPointer);
	        if (currentSum < 0){
	            lPointer=rPointer;
	        }

	        if (maxSum < currentSum){
	            maxSum = currentSum;
	        }
	        
	        if (rPointer >= data.length){
	            return maxSum;
	        	//System.out.println(maxSum);
	        }
	    }
	}
	
	
	//to iterate the whole thing we need to step until rPointer = length
	public static int findSum(int[] data, int lPointer, int rPointer) {
	    int sum = 0;
	    for (int i = lPointer; i<rPointer; i++){
	        sum += data[i];
	    }
	    return sum;
	}
