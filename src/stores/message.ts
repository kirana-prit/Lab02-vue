import type {MessageState} from '@/types';
import {defineStore} from 'pinia';
export const useMessageStore = defineStore('message',{
  state: (): MessageState => ({
    messages: '',
  }),
  actions: {
   updateMessage(message: string): void {
      this.messages = message;
    },
    resetMessage() : void{
      this.messages = '';
    },
  },
})
