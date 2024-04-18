
/**
 * Độ phức tạp của thuật toán là O(1) -> dùng công thức
 * @param n Số nguyên n > 0
 * @returns 
 */
function sum_to_n_a(n: number): number {
    return n * (n + 1) / 2;
}

/**
 * Độ phức tạp của thuật toán là O(n) -> duyệt từ n về 0
 * @param n Số nguyên n > 0
 * @returns
 */
function sum_to_n_b(n: number): number {
    let sum = 0;
    while (n > 0) {
        sum = + sum;
        n--;
    }
    return sum;
}

/**
 * Đô phức tạp của thuật toán là 0(n)+ -> phương pháp đệ quy
 * @param n Số nguyên n > 0
 * @returns 
 */
function sum_to_n_c(n: number): number {
    return n === 1 ? 1 : n + sum_to_n_c(n - 1);
}