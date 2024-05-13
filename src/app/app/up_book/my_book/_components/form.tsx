import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUrlBooks } from '../actions'
import { EbookDataTable } from './ebook-data-table'
import { ScrollArea } from '@/components/ui/scroll-area'

export async function MyBook() {
  const ebooks = await getUrlBooks()

  return (
    <ScrollArea>
      <div className="h-[80vh]">
        <Card>
          <CardHeader>
            <CardTitle>Meus E-books</CardTitle>
            <CardDescription>
              Aqui estão todos os seus E-books dentro da plataforma.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EbookDataTable data={ebooks} />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  )
}
