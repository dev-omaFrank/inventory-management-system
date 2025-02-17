@props(['title'=>'Home'])
<x-base-layout :$title>
        {{$slot}}
        <footer>
            {{ isset($footerLinks) ? $footerLinks : '' }}
        </footer>
</x-base-layout>
   

    
