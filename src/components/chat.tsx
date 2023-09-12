'use client'

import { useEffect, useRef, useState } from "react";
import { BiSolidSend } from "react-icons/bi";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Message from "./message";
import useAutoResizeTextArea from "@/hooks/useAutoResizeTextArea";

type ChatProps = {
}

const Chat = ({}: ChatProps) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [showEmptyChat, setShowEmptyChat] = useState(true);
  const [conversation, setConversation] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const textAreaRef = useAutoResizeTextArea();
  const bottomOfChatRef = useRef<HTMLDivElement>(null);

  //Aumentar altura do input de acordo com quantidade de linhas
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "24px";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [message, textAreaRef]);

  //scroll quando uma mensagem for adicionada no final do chat
  useEffect(() => {
    if (bottomOfChatRef.current) {
      bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (message.length < 1) {
      setErrorMessage("Please enter a message.");
      return;
    } else {
      setErrorMessage("");
    }

    setConversation([
      ...conversation,
      { content: message, role: "user" },
      { content: null, role: "system" },
    ]);

    setMessage("");
    setShowEmptyChat(false);

    setConversation([
      ...conversation,
      { content: message, role: "user" },
      { content: 'Texto gerado pelo gpt', role: "system" },
    ]);
  };

  // Enviar mensagem ao apertar enter, no lugar de pular a linha
  const handleKeypress = (e: any) => {
    if (e.keyCode == 13 && !e.shiftKey) {
      sendMessage(e);
      e.preventDefault();
    }
  };

  return (
    <div className="flex max-w-full flex-1 flex-col">
      <div className="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
        >
          <span className="sr-only">Open sidebar</span>
          <RxHamburgerMenu className="h-6 w-6 text-white" />
        </button>
        <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
        <button type="button" className="px-3">
          <BsPlusLg className="h-6 w-6" />
        </button>
      </div>
      <div className="relative overflow-hidden scroll-auto h-full w-full transition-width flex flex-col items-stretch flex-1">
        <div className="flex-1 overflow-hidden">
          <div className="react-scroll-to-bottom--css-ikyem-79elbk h-full dark:bg-gray-800">
            <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu">
              <div className="h-full dark:bg-gray-800 flex flex-col justify-between">
                {!showEmptyChat && conversation.length > 0 ? (
                  <div className="flex flex-col items-center text-sm bg-gray-800">
                    <div className="flex w-full items-center justify-center gap-1 border-b border-black/10 bg-gray-50 p-3 text-gray-500 dark:border-gray-900/50 dark:bg-gray-800 dark:text-gray-300 py-5 text-sm">
                      Default (GPT-3.5)
                    </div>
                    {conversation.map((message, index) => (
                      <Message key={index} message={message} />
                    ))}
                    <div className="w-full h-32 md:h-32 flex-shrink-0"></div>
                    <div ref={bottomOfChatRef}></div>
                  </div>
                ) : null}
                {showEmptyChat ? (
                  <div className="py-10 px-2 relative w-full flex flex-col h-full items-center">
                    <div className="flex items-center justify-center gap-2 relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                      <button
                        className="relative flex w-full cursor-default flex-col rounded-md border border-black/10 bg-white py-2 pl-3 pr-10 text-left focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 dark:border-white/20 dark:bg-gray-800 sm:text-sm align-center"
                        type="button"
                      >
                        <label
                          className="block text-xs text-gray-700 dark:text-gray-500 text-center"
                          id="headlessui-listbox-label-:r1:"
                          data-headlessui-state=""
                        >
                          Model
                        </label>
                          <span className="w-full flex h-6 items-center gap-1 truncate text-white">
                            Default (GPT-3.5)
                          </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <BsChevronDown className="h-4 w-4 text-gray-400" />
                        </span>
                      </button>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 dark:text-gray-600 flex gap-2 items-start justify-center mt-16 h-full">
                      ChatGPT
                    </h1>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-16 md:mb-24 xl:mb-20 text-gray-500 lg:max-w-2xl xl:max-w-3xl">
                      <li className="border border-gray-500/50 rounded-xl px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm truncate">
                        <h3 className="font-semibold">Give me ideas</h3>
                        <span className="opacity-50">for what to do with my kids art</span>
                      </li>
                      <li className="border border-gray-500/50 rounded-xl px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm truncate">
                        <h3 className="font-semibold">Compare design principles</h3>
                        <span className="opacity-50">for mobile apps and desktop software</span>
                      </li>
                      <li className="border border-gray-500/50 rounded-xl px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm truncate hidden md:block">
                        <h3 className="font-semibold">Show me a code snippet</h3>
                        <span className="opacity-50">of a website sticky header</span>
                      </li>
                      <li className="border border-gray-500/50 rounded-xl px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm truncate hidden md:block">
                        <h3 className="font-semibold">Brainstorm names</h3>
                        <span className="opacity-50">for my fantasy football team with a frog theme</span>
                      </li>
                    </ul>
                  </div>
                ) : null}
              </div>
            <div className="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
                <form className="mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
                  <div className="relative flex flex-col h-full flex-1 md:flex-col">
                    {errorMessage ? (
                      <div className="mb-2 md:mb-0">
                        <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                          <span className="text-red-500 text-sm">{errorMessage}</span>
                        </div>
                      </div>
                    ) : null}
                    <div className="flex flex-col justify-center w-full flex-grow py-2 md:py-4 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                      <textarea
                        ref={textAreaRef}
                        value={message}
                        tabIndex={0}
                        style={{
                          height: "24px",
                          maxHeight: "200px",
                          overflowY: "hidden",
                        }}
                        // rows={1}
                        placeholder="Send a message"
                        className="m-0 w-full resize-none border-0 bg-transparent placeholder:text-gray-400/60 p-0 pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-3 md:pl-0 text-sm pt-0.5"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeypress}
                      ></textarea>
                      <button
                        onClick={sendMessage}
                        className="absolute p-1 rounded-md bg-transparent disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40"
                      >
                        <BiSolidSend className="h-5 w-5 mr-1  text-gray-600" />
                      </button>
                    </div>
                    <div className="px-3 pt-2 text-center text-xs text-black/50 dark:text-white/80 md:px-4 md:pt-3">
                      <span>
                        Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts. <span className="underline cursor-pointer">ChatGPT August 3 Version</span>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;