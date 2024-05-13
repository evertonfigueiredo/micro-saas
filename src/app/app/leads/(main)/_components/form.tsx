'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getTags } from '../actions'
import { TagDataTable } from './lead-data-table'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect, useState } from 'react'
import { Tag } from '../type'

export function TagForm() {
  const [tags, setTags] = useState<Tag[]>([])

  const fetchData = async () => {
    const newTags = await getTags()
    setTags(newTags)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleTagAction = async () => {
    fetchData()
  }

  return (
    <ScrollArea>
      <div className="h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle>Meus Leads</CardTitle>
            <CardDescription>
              Aqui estão todos os seus Leads, cadastrados até o momento.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-0">
            <TagDataTable data={tags} onTagAction={handleTagAction} />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
