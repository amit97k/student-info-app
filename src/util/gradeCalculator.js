export const gradeCalculation = (grades) => {
    
    let totalMarks = 0;
    Object.keys(grades).forEach(mark => {
        totalMarks += grades[mark]
    })
    let averageMarks = totalMarks/5;
    
    if (averageMarks >= 95) {
        return 'A1';
    } else if (averageMarks >= 90) {
        return 'A2';
    } else if (averageMarks >= 80) {
        return 'B1';
    } else if (averageMarks >= 70) {
        return 'B2';
    } else if (averageMarks >= 60) {
        return 'C1';
    } else if (averageMarks >= 50) {
        return 'C2';
    } else if (averageMarks >= 40) {
        return 'D';
    } else {
        return 'F';
    }
};