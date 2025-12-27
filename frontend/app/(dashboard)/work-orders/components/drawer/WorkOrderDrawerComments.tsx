import React, { useState } from 'react';
import { WorkOrder } from '../../types/workorder.types';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface WorkOrderDrawerCommentsProps {
    workOrder: WorkOrder;
    onUpdate: (updatedWorkOrder: WorkOrder) => void;
}

export function WorkOrderDrawerComments({ workOrder, onUpdate }: WorkOrderDrawerCommentsProps) {
    const comments = workOrder.comments || [];
    const [newMessage, setNewMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const newComment = {
            id: Date.now().toString(),
            author: 'Current User', // Mocked
            message: newMessage,
            createdAt: new Date().toISOString(),
        };

        onUpdate({
            ...workOrder,
            comments: [...comments, newComment]
        });
        setNewMessage('');
    };

    return (
        <div className="flex flex-col h-full">
            <h3 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">Activity & Comments</h3>

            <div className="flex-1 space-y-6">
                {comments.length === 0 ? (
                    <p className="text-sm italic text-gray-500 dark:text-gray-400">No comments yet</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
                                    {comment.author.charAt(0)}
                                </span>
                            </div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-semibold text-gray-900 dark:text-white">
                                        {comment.author}
                                    </h4>
                                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                        {new Date(comment.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {comment.message}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={handleSubmit} className="mt-6 relative">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full rounded-md border-0 bg-gray-50 py-3 pr-12 pl-4 text-sm text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-900/50 dark:text-white dark:ring-gray-800 dark:placeholder:text-gray-500 dark:focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="absolute right-2 top-2 rounded-md p-1 text-gray-400 hover:text-indigo-600 disabled:opacity-50 dark:hover:text-indigo-400"
                >
                    <PaperAirplaneIcon className="h-5 w-5" />
                </button>
            </form>
        </div>
    );
}
