import React from 'react'
import Conversation from './Conversation'
import useGetConversation from '../../hooks/useGetConversation';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { getRandomEmoji } from '../../utils/emoji';

const Conversations = () => {
  const {loading, conversations} = useGetConversation();
  return (
    <div className='py-2 flex flex-col overflow-auto'>

      {conversations.map((conversation, index) => (
        <Conversation
            //passing props
            key={conversation._id}
            conversation = {conversation}
            emoji = {getRandomEmoji()}
            lastIndex = {index === conversations.length - 1}
        />
      ))}

      { loading ? <span> <AiOutlineLoading3Quarters /></span> : null }
    </div>
  )
}

export default Conversations
