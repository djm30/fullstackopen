import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Blog from "./Blog";

describe("<Blog/>", () => {
  test("It should render to the screen", async () => {
    const blog = {
      title: "Component testing is done with react-testing-library",
      author: "University of Helsinki",
      URL: "https://fullstackopen.com",
      likes: 0,
      id: "213213941",
    };

    const { container } = render(<Blog blog={blog} />);

    const element = container.querySelector(".container");
    expect(element).toBeDefined();
  });

  test("Full info should be shown when the view button is pressed", async () => {
    const blog = {
      title: "Component testing is done with react-testing-library",
      author: "University of Helsinki",
      url: "https://fullstackopen.com",
      likes: 3,
      id: "213213941",
    };

    const { container } = render(<Blog blog={blog} />);

    const button = screen.getByText("Show Full");
    await button.click();
    const element = container.querySelector(".container");
    const url = await screen.findByText(`${blog.url}`);
    const likes = await screen.findByText(`Likes: ${blog.likes}`);

    expect(url).toBeDefined();
    expect(likes).toBeDefined();
    expect(element).toBeDefined();
  });

  test("Like button being pressed twice should call handler twice", async () => {
    const likePostMock = jest.fn();

    const blog = {
      title: "Component testing is done with react-testing-library",
      author: "University of Helsinki",
      url: "https://fullstackopen.com",
      likes: 3,
      id: "213213941",
    };

    const { container } = render(<Blog likePost={likePostMock} blog={blog} />);

    const button = screen.getByText("Show Full");
    await button.click();

    const element = container.querySelector(".container");

    const likeButton = screen.getByText("Like Post");
    await likeButton.click();
    await likeButton.click();

    expect(likePostMock.mock.calls).toHaveLength(2);
    expect(element).toBeDefined();
  });
});
