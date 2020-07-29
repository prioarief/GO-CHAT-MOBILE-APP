import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import HeaderChat from '../components/atoms/HeaderChat';

const Example = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
        sent: true,
      },
    ]);
  }, []);

  const onSend = useCallback((val = []) => {
    // val[0].sent = true;
    val[0].received = true;
    // (val[0].image = 'https://facebook.github.io/react/img/logo_og.png'),
    // val[0].pending = true;
    console.log(val);
    setMessages((previousMessages) => GiftedChat.append(previousMessages, val));
  }, []);

  return (
    <>
      <HeaderChat name="Prio" image={null} />
      <GiftedChat
        messages={messages}
        onSend={(val) => onSend(val)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
};

export default Example;
