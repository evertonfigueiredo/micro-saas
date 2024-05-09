import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getUrlBooks } from '../actions'

export async function MyBook() {
  const url = await getUrlBooks()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nome</CardTitle>
        <CardDescription>{url}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  )
}
