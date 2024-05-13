import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getTags } from '../actions'
import { TagDataTable } from './tag-data-table'
import { ScrollArea } from '@/components/ui/scroll-area'

export async function TagForm() {
  const tags = await getTags()

  return (
    <ScrollArea>
      <div className="h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle>Minhas Tags</CardTitle>
            <CardDescription>
              Aqui estão todos as suas Tags, as Tags servem para organizar sua
              lista de envio.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-0">
            <TagDataTable data={tags} />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
