import { v4 } from 'https://deno.land/std@0.98.0/uuid/mod.ts';
import { Book } from '../../../common/models/models.ts';
import { readFile, writeFile } from '../../../helpers/helpers.ts';

const isBookExists = async (booksDataPath: URL, name: string): Promise<Book | null> => {
  const books = await getAllBooks(booksDataPath);
  return books.find(book => book.name === name) || null;
}

export const getAllBooks = async (booksDataPath: URL): Promise<Book[]> => {
  const books = await readFile(booksDataPath);
  return JSON.parse(books);
}

export const getBookById = async (booksDataPath: URL, id: string): Promise<Book | null> => {
  const books = await getAllBooks(booksDataPath);
  return books.find(book => book.id === id) || null;
}

export const createBook = async (booksDataPath: URL, payload: Omit<Book, 'id'>): Promise<Book> => {
  const bookExists = await isBookExists(booksDataPath, payload.name);
  if (!bookExists) {
    const prevBooks = await getAllBooks(booksDataPath);
    const newBook = { id: v4.generate(), ...payload };
    await writeFile(booksDataPath, JSON.stringify([...prevBooks, newBook], null, '\t'));
    return newBook;
  }
  return bookExists;
}

export const updateBook = async (booksDataPath: URL, id: string, payload: Book): Promise<Book> => {
  const books = await getAllBooks(booksDataPath);
  const updatedBooks = books.map(book => book.id === id ? payload : book);
  await writeFile(booksDataPath, JSON.stringify(updatedBooks, null, '\t'));
  return payload;
}

export const deleteBook = async (booksDataPath: URL, id: string): Promise<boolean> => {
  const books = await getAllBooks(booksDataPath);
  const newBooks = books.filter(book => book.id !== id);
  await writeFile(booksDataPath, JSON.stringify(newBooks, null, '\t'));
  return books.length === newBooks.length;
}