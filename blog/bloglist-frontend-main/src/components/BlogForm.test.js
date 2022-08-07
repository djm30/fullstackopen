import React, { Component } from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

jest.mock("../services/blogs", () => ({
  create: Promise.resolve({
    title: "Title",
    author: "author",
    url: "url",
    likes: 0,
  }),
}));

describe("<BlogForm/>", () => {
  test("Submitting the form should call the event handler", async () => {
    const mockSetBlogs = jest.fn();
    const mockSetMessage = jest.fn();

    const user = userEvent.setup();

    const { container } = render(
      <BlogForm setBlogs={mockSetBlogs} setMessage={mockSetBlogs} />,
    );

    const [titleInput, authorInput, urlInput] = screen.getAllByRole("textbox");
    await user.type(titleInput, "title");
    await user.type(authorInput, "author");
    await user.type(urlInput, "url");

    const button = screen.getByText("Create");
    await button.click();

    expect(mockSetBlogs.mock.calls).toHaveLength(1);
  });
});
