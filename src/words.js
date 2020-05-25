const words = ['golf', 'fotboll', 'programmering', 'gym', 'react', 'express', 'csharp'];

export const WordGenerator = () => {
    return words[Math.ceil(Math.random() * words.length - 1)];
}